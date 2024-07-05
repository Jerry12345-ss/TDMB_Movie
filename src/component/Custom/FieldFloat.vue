<template>
    <!-- <Field v-bind="$attrs" v-slot="{ field, errors, errorMessage }">
        <input
            v-bind="field" 
            :type="$attrs.type || 'type'"
            :class="$attrs.class || 'form-control'"
            :placeholder="$attrs.placeholder"
        >
        <span style="color: red;">{{ errorMessage }}</span>
    </Field> -->
    <Field v-bind="$attrs"></Field>
    <ErrorMessage :name="$attrs.name" style="color: red;"/>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';
</script>

<style scoped lang="scss"></style>