export enum propsTypeEnum {
    TEXT = "text",    //不限制
    NUMBER = "number",   //数字
    DECIMAL = "decimal",   //小数
    WORD = 'word',   //字母数字汉字
    PASSWORD = 'password'    //字母数字特殊符号
}

export type inputType = "textarea" | "text" | "password" | undefined

export type Size = "tiny" | "small" | "medium" | "large"