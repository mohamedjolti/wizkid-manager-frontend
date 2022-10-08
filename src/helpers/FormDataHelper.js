/**
 * 
 * @param {JSON} object 
 * @returns 
 */
export const FormDataHelper=function(object){
        var fd=new FormData();
        for (var key in object) {
                 fd.append(key,object[key]);
              
        }
        return fd;
    
}