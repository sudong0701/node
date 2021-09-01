import { App, ComponentOptions, Plugin } from 'vue'

import mlInput from './input'
import mlDialog from './dialog'
import mlButton from './button'
import mlForm from './form'

const components = [
	mlInput,
	mlDialog,
	mlButton,
	mlForm
]

//按需创建

export function installMlUI(app: App, options?: Array<string>): void {
	components.map((component: ComponentOptions & Plugin) => {
		if (options && options.indexOf(component.name as string) > -1) {
			app.use(component)
		} else {
			app.use(component)
		}	
	})
}

