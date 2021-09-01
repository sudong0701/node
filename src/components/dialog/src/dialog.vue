<template>
    <el-dialog :title="title" v-model="comIsShow" :width="width" :top="top" @close="closeDialog" :show-close="showClose" :close-on-press-escape="closeOnPressEscape" :close-on-click-modal="closeOnClickModal">
        <slot></slot>
        <template #footer>
            <span class="dialog-footer">
                <ml-button v-if="cancel" @click="closeDialog">取 消</ml-button>
                <ml-button v-if="confirm" type="primary" @click="handleConfirm">确 定</ml-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { ElDialog } from "element-plus";

export default defineComponent({
	name: 'mlDialog',
    components: {
        ElDialog,
    },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        cancel: {
            type: Boolean,
            default: true,
        },
        confirm: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: "",
        },
		width: {
			type: String,
			default: ''
		},
		top: {
			type: String, 
			default: ''
		},
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        }
    },
    emits: ["update:isShow", "confirm", "cancel"],
    setup(props, { emit }) {
        const computedProps = computed(() => ({ ...props }));
        const comIsShow = ref<boolean>(false);

        onMounted(() => {
            comIsShow.value = props.isShow;
        });

        /**
         * 点击dialog关闭按钮时触发
         * @param
         * @return
         */
        const closeDialog = () => {
            comIsShow.value = false;
            emit("update:isShow", false);
			emit("cancel")
        };

		/**
         * 处理修改密码弹框确定事件
         * @param
         * @return
         */
		const handleConfirm = ()=> {
			emit("confirm");
		}

        watch(
            () => {
                return props.isShow;
            },
            (val) => {
                comIsShow.value = val;
            }
        );

        return {
            computedProps,
            comIsShow,
            closeDialog,
			handleConfirm
        };
    },
});
</script>
