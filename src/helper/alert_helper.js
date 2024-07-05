import Swal from 'sweetalert2';

const successToast = Swal.mixin({
    toast : true,
    position : 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    title: '操作成功',
    icon: 'success'
});

const alertSuccess = (opt = {}) =>{
    return successToast.fire(opt);
}

const alertError = (opt = {}, error) =>{
    // 如果是自定義會是 opt, 但如果有 error 則是會以 error 取代
    return Swal.fire(Object.assign(
        opt,
        {
            title : error?.response.data?.status_message || opt?.title,
            text : opt?.text || '',
            icon : 'error',
            ...commonOpt
        }
    )); 
}

const alertWarning = (opt = {}) =>{
    return Swal.fire(Object.assign(
        {
            title : '',
            text : '',
            icon : 'warning',
            showCancelButton : true,
            cancelButtonText : '取消',
            cancelButtonColor : '#14bdcc',
            ...commonOpt
        },
        opt
    )); 
}

const alertQuestion = (opt = {}) =>{
    return Swal.fire(Object.assign(
        {
            title : '',
            text : '',
            icon : 'question',
            showCancelButton : true,
            cancelButtonText : '取消',
            cancelButtonColor : '#14bdcc',
            ...commonOpt
        },
        opt
    ));
}

const commonOpt = {
    showCloseButton : true,
    showConfirmButton : true,
    confirmButtonText : '確定',
    confirmButtonColor : 'cornflowerblue',
};

export { alertSuccess, alertError, alertWarning, alertQuestion };