interface pdfToImgParamsConfig {
	url: string,
	scale?: number,
	isWhole?: boolean
}

interface isEmptyArrayConfig {
	(params: Array<string>):boolean
}

interface pdfToImgConfig {
	(params: pdfToImgParamsConfig):Promise<string | Array<string>>
}

/**
 校验数组是否存在空数据
 @param {String}a 变量
 @return 是否为空
 */
export const isEmptyArray:isEmptyArrayConfig = function (arr) {
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i])
			return true;
	}
	return false;
}


export const pdfToImg:pdfToImgConfig = function ({ url, scale = 1, isWhole = false }) {
	return new Promise((resolve, reject) => {
		try {
			window.pdfjsLib.workerSrc = 'pdf.worker.js';
			const loadingTask = window.pdfjsLib.getDocument(url)
			loadingTask.promise.then((pdf:any) => {
				const pageNum:number = pdf.numPages, imgSrcArr:Array<string> = []
				for (let i = 0; i < pageNum; i++) {
					pdf.getPage(i + 1).then((page:any) => {
						const viewport = page.getViewport(scale)
						viewport.width = viewport.width ? viewport.width : (viewport.viewBox[2] ? viewport.viewBox[2] : 595.3) * scale
						viewport.height = viewport.height ? viewport.height : (viewport.viewBox[3] ? viewport.viewBox[3] : 841.9) * scale
						const canvas = document.createElement("canvas")
						const context = canvas.getContext('2d')
						canvas.width = viewport.width
						canvas.height = viewport.height
						//根据X轴翻转
						const y = viewport.height / 2;
						(context as CanvasRenderingContext2D).translate(0, y);
						(context as CanvasRenderingContext2D).scale(scale, -scale);
						(context as CanvasRenderingContext2D).translate(0, -y / scale)
						const renderContext = {
							canvasContext: context,
							viewport: viewport
						}
						const renderTask = page.render(renderContext)
						renderTask.promise.then(() => {
							const imgSrc = canvas.toDataURL('image/jpeg', 1)
							if (imgSrc) {
								imgSrcArr[i] = imgSrc
							}
							if (imgSrcArr.length === pageNum && !isEmptyArray(imgSrcArr)) {
								if (isWhole) {
									const canvasWhole = document.createElement("canvas")
									const contextWhole = canvasWhole.getContext('2d')
									canvasWhole.width = viewport.width
									canvasWhole.height = viewport.height * pageNum
									let count:number = 0
									for (let j = 0; j < pageNum; j++) {
										const imgItem = new Image();
										imgItem.src = imgSrcArr[j];
										imgItem.width = viewport.width;
										imgItem.height = viewport.height;
										imgItem.onload = function () {
											(contextWhole as CanvasRenderingContext2D).drawImage(imgItem, 0, viewport.height * j)
											if (++count == pageNum) {
												resolve(canvasWhole.toDataURL('image/jpeg', 1))
											}
										}
									}
								} else {
									resolve(imgSrcArr)
								}
							}
						})
					})
				}
			})
		} catch (error) {
			reject(error)
		}
	})
}
