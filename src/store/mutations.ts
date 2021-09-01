import { MutationTree } from 'vuex'
import { stateConfig, mediaSizeType } from './state'
import { mutationTypes } from './mutation-types'

export type Mutations<T = stateConfig> = {
	[mutationTypes.SET_MEDIASIZE](state: T, mediaSize: string): void
}

export const mutations: MutationTree<stateConfig> & Mutations = {
	[mutationTypes.SET_MEDIASIZE](state: stateConfig, mediaSize: mediaSizeType) {
		state.mediaSize = mediaSize
	}
}
