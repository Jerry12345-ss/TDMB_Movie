<template>
    <main>
        <div class="d-flex flex-column">
            <div class="login-logo mb-4">
                <h2>MOVIEWEB</h2>
            </div>
            <div class="container">
                <div class="login-form-container">
                    <div class="login-title">
                        <h2>登入</h2>
                    </div>

                    <!-- 2種 Componet API 寫法的 vee-validate, 這邊我不使用 Componsition API (useForm、useField) 寫法 -->
                    <Form @submit="onSubmit">
                        <div class="row">
                            <div class="form-area mb-2">
                                <div class="form-floating mb-3">
                                    <Field class="form-control" id="floatingInputEmail" placeholder="" type="email" v-model="loginData.email" name="email" label="電子郵件" :rules="{ required : true, email : true }"/>
                                    <label for="floatingInputEmail">電子郵件</label>
                                    <ErrorMessage name="email" style="color: red;"/>
                                </div>
                            </div>
                            <div class="form-area mb-2">
                                <div class="form-floating mb-3">
                                    <Field v-model="loginData.password" name="password" label="密碼" :rules="{ required : true, min : 8 }" v-slot="{ field, errorMessage }">
                                        <input type="password" class="form-control" id="floatingInputPassword" placeholder="" v-bind="field">
                                        <span style="color: red;">{{ errorMessage }}</span>
                                    </Field>
                                    <label for="floatingInputPassword">密碼</label>
                                </div>
                            </div>

                            <!-- <div class="form-area mb-2">
                                <div class="mb-3">
                                    <FieldFloat class="form-control" name="username" label="使用者名稱" placeholder="使用者名稱" rules="required" v-model="loginData.username" type="text"/>
                                </div>
                            </div> -->

                            <div style="padding: 0 0.75rem;">
                                <button class="btn">登入</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
// import FieldFloat from '../component/Custom/FieldFloat.vue';
import { reactive } from 'vue';
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore();

const loginData = reactive({
    email : null,
    password : null,
});

const onSubmit = (data) =>{
    loginStore.login(data);
}
</script>

<style scoped lang="scss">
main{
    width: 100%;
    // min-height: 100vh;
    background-image: url('../assets/img/login.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative;

    .d-flex{
        min-height: 100vh;
        width: 100%;
        position: relative;
        overflow: hidden;

        .login-logo{
            padding: 15px 25px;
            margin: 0 auto;
            width: 1400px;

            h2{
                font-family: 'Roboto';
                color: rgb(229,9,20); 
                font-weight: bold; 
                margin-bottom: 0;
                letter-spacing: 2px;
            }
        }

        .container{
            width: 100%;
            padding: 0 25px;
            display: block;
            margin: 0 auto;
            max-width: 480px !important;
            flex: 1;
            // 不知為何是寫在這裡
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);


            .login-form-container{
                padding: 2.5rem;
                border-radius: 6px;
                background-color: rgba(0 , 0, 0, .7);

                .login-title{
                    color: #ffffff;

                    h2{
                        text-align: center;
                        margin-bottom: 1.5rem;
                    }
                }
                .row{
                    .form-area{
                        .form-control{
                            background-color: transparent;
                            border: 1px solid #b6b6b6;
                            box-shadow: none;
                            color: #ffffff;

                            &:focus{
                                border: 3px solid #ffffff;
                            }
                        }

                        input:-webkit-autofill,
                        input:-webkit-autofill:hover, 
                        input:-webkit-autofill:focus, 
                        input:-webkit-autofill:active{
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: #ffffff;
                            transition: background-color 5000s ease-in-out 0s;
                        }

                        label{
                            color: #b6b6b6;

                            &::after{
                                background-color: transparent;
                            }
                        }
                    }

                    .btn{
                        background-color: rgb(229,9,20);
                        color: #ffffff;
                        padding-top: .5rem;
                        padding-bottom: .5rem;
                        width: 100%;
                        transition: all .2s ease-out;

                        &:hover{
                            background-color: rgb(199, 7, 17);
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width : 768px){
    .login-logo{
        h2{
            font-size: 38px;
        }
    }
}
</style>