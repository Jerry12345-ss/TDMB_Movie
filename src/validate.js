// 定義 vee-validate 驗證規則
import { defineRule, configure } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json'; 

// 引入全部規則, 內置規則達25種以上
Object.keys(rules).forEach(rule => {
    defineRule(rule, rules[rule])
});

configure({
    // validateOnBlur => default true
    // validateOnChange => default true
    validateOnInput : true, // default false => 即時驗證的開啟與否
    generateMessage : localize({
        zh_TW
    }),
});

setLocale('zh_TW');
