import { stateConfig, mediaSizeType } from './state'

export const getters = {
	mediaSize: (state: stateConfig): mediaSizeType => {
		return state.mediaSize
	}
}