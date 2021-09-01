<template>
    <div :class="`${fullWidth ? 'ml-input' : '2xl:w-largeSelect xl:w-mediumSelect w-smallSelect'}`">
        <NInput v-model:value="comValue" @input="update" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :minlength="minlength" :round="round" :maxlength="maxLength" :clearable="clearable" :size="mediaSize" :type="type" :rows="rows" @blur="blur" @clear="clear" @focus="focus">
            <template #prefix>
                <slot name="prefix"></slot>
            </template>
            <template #suffix>
                <slot name="suffix"></slot>
            </template>
        </NInput>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    ref,
    onMounted,
    watch,
    PropType,
    ComputedRef,
} from "vue";
import { NInput } from "naive-ui";
import { propsTypeEnum, inputType } from "./data.d";
import { Size } from "./data.d";
import {
    filterNumber,
    filterDecimal,
    filterWord,
    filterPassword,
} from "../../../utils/filters";
import { useStore } from "vuex";

export default defineComponent({
    name: "mlInput",
    components: {
        NInput,
    },
    props: {
        value: {
            //输入框的初始值
            type: [String],
            default: "",
        },
        type: {
            type: String as PropType<inputType>,
            default: "",
        },
        limit: {
            //输入框限制
            type: String,
            default: "text", //text number decimal password
        },
        size: {
            type: String as PropType<Size>,
            default: "",
        },
        decimal: {
            //保留的小数位
            type: [String, Number],
            default: 0,
        },
        maxLength: {
            //最大长度
            type: [Number],
            default: undefined,
        },
        minlength: {
            //最小长度
            type: [Number],
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "请输入",
        },
        round: {
            type: Boolean,
            default: false,
        },
        clearable: {
            //是否展示清空按钮
            type: Boolean,
            default: false,
        },
        fullWidth: {
            //宽度是否撑满
            type: Boolean,
            default: true,
        },
        rows: {
            type: Number,
            default: 2
        }
    },
    emits: ["change", "update:value", "blur", "clear", "focus"],
    setup(props, { emit }) {
        const store = useStore();
        const mediaSize: ComputedRef<Size> = computed(
            () => store.getters.mediaSize
        );
        const computedProps = computed(() => ({ ...props }));
        const comValue = ref<string>("");

        /**
         * 输入框值change时触发
         * @param {string} val 输入框的值
         * @return
         */
        const update = (val: any) => {
            if (props.limit === propsTypeEnum.NUMBER) {
                val = filterNumber(val);
            } else if (props.limit === propsTypeEnum.DECIMAL) {
                val = filterDecimal(val, Number(props.decimal)); //小数点后最多 this.decimalLength 位
            } else if (props.limit === propsTypeEnum.WORD) {
                val = filterWord(val);
            } else if (props.limit === propsTypeEnum.PASSWORD) {
                val = filterPassword(val);
            }
            comValue.value = val;
            emit("update:value", val);
        };

        /**
         * 输入框获焦时触发
         * @param {Event} e 事件参数
         * @return
         */
        const focus = (e: Event) => {
            emit("focus", e);
        };

        /**
         * 输入框失焦时触发
         * @param {Event} e 事件参数
         * @return
         */
        const blur = (e: Event) => {
            emit("blur", e);
        };

        /**
         * 点击清空按钮时触发
         * @param {Event} e 事件参数
         * @return
         */
        const clear = () => {
            emit("clear");
        };

        /**
         * 钩子函数(Vue实例挂载完成触发)
         * @param
         * @return
         */
        onMounted(() => {
            comValue.value = props.value;
        });

        /**
         * 监听输入框值改变
         * @param
         * @return
         */
        watch(
            () => {
                return props.value;
            },
            (val) => {
                comValue.value = val;
            }
        );

        return {
            computedProps,
            mediaSize,
            comValue,
            update,
            blur,
            focus,
            clear,
        };
    },
});
</script>

<style lang="scss" scoped>
.ml-input {
    width: 100%;
}
</style>
