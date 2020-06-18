export const http =async function({url,type='get',data}){
    return await $.ajax({
        url,
        type,
        data,
        success:(result)=>{
            return result
        }
    })
}