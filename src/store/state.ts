export type mediaSizeType = 'large' | 'medium' | 'small'

export interface stateConfig {
	mediaSize: mediaSizeType
}

export const state:stateConfig = {
	mediaSize: 'medium'
}