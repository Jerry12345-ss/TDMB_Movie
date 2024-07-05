<template>
    <div class="container-error">
        <h2>404 Page Not Found !</h2>
        <RouterLink to="/">
            <button class="btn btn-primary">Go to Home</button>
        </RouterLink>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container-error{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;

    h2{
       font-size: 50px;
       margin-bottom: 0;
       color: rgb(229, 9, 20); 
    }

    button{
        margin-top: 1.5rem;
        border-radius: 20px;
        display: inline-block;
        background-color: transparent;
        color: rgb(229, 9, 20);
        border: 2px solid rgb(229, 9, 20);
        padding: 8px 30px;
        transition: all .2s ease-out;

        &:hover{
            background-color: rgb(229, 9, 20);
            color: #ffffff;
        }
    }
}
</style>