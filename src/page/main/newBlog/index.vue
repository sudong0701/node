<template>
	<div class="w-1/4 p-xl">
		<n-form label-placement="left">
			<n-form-item label="标题：">
				<ml-input v-model:value="blogData.title"></ml-input>
			</n-form-item>

			<n-form-item label="内容：">
				<ml-input v-model:value="blogData.content" type="textarea"></ml-input>
			</n-form-item>
		</n-form>
		<ml-button class="m-auto" @click="submit">提交</ml-button>		
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {  } from 'element-plus'
import { NForm, NFormItem } from 'naive-ui'
import { BlogData } from './data.d'
import { requestApi } from '../../../utils/axios'


export default defineComponent({
	components: {
		NForm,
		NFormItem
	},
	setup() {
		const blogData = reactive<BlogData>({
			title: '',
			content: ''
		})
		const submit = ()=> {
			requestApi<BlogData, void>({
				url: '/api/blog/new',   //`${import.meta.env.VITE_APP_API}/api/blog/new`,
				data: blogData
			}).then(()=> {
				window.$message.success('新增成功')
			})
		}
		return {
			blogData,
			submit
		}
	},
})
</script>
