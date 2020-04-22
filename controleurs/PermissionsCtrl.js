
var async = require('async-if-else')(require('async')); 


module.exports = function (user,  permission) {


function addNewPermission(req, res, rep){
    
    let description=req.body.description;
    let emailCreatedBy=req.body.emailCreatedBy;
    if(description==null || emailCreatedBy==null){
        response = {
            'statutCode': 400, //bad request
            'error': 'missing parameters'
        }
        rep(response);
    }else{
        async.series({
            createdByExistant(callback){
                
                user.findOne({
                    where: {
        
                        'email': emailCreatedBy, 
                        
        
                    }
                }).then(function(adminFound){
                    if(adminFound){
                        adminCallback=adminFound;
                        callback();
                    }else{
                        response = {
                            'statutCode': 404, // error
                            'error': 'user createdBy is nonexistent'                                }
                        rep(response);

                    }
                }).catch(function(err){
                    response = {
                        'statutCode': 500, // error
                        'error': 'Error appeared' + err
                    }
                    rep(response);
                })

            },
            

            addNewPermission(callback){
                permission.create({
                    
                    description,
                    createdById:adminCallback.id

                }
                   
                ).then(function(createdPermission){
                    if(createdPermission){
                        response = {
                            'statutCode': 201, // created
                            'success': 'the permission was successfully created'
                        }
                        rep(response);

                    }else{
                        response = {
                            'statutCode': 500, // error
                            'error': 'error in adding new permission' + err
                        }
                        rep(response);

                    }
                }).catch(function(err){
                    response = {
                        'statutCode': 500, // error
                        'error': 'error in adding new permission' + err
                    }
                    rep(response);

                })
            }
        })
        

        




    }



}



function updatePermission(req, res, rep){
    let id=req.body.id;
    let newDescription=req.body.newDescription;
    let updatedBy=req.body.updatedBy;
    if(id==null || updatedBy==null ){
        response = {
            'statutCode': 400, //bad request
            'error': 'missing parameters'
        }
        rep(response);
    }else{
        async.series({
            updatedByExistant(callback){
                
                user.findOne({
                    where: {
        
                        'email': updatedBy, 
                       
        
                    }
                }).then(function(adminFound){
                    if(adminFound){
                        adminCallback=adminFound;
                        callback();
                    }else{
                        response = {
                            'statutCode': 404, // error
                            'error': 'user updatedBy is nonexistent'                                }
                        rep(response);

                    }
                }).catch(function(err){
                    response = {
                        'statutCode': 500, // error
                        'error': 'error appeared' + err
                    }
                    rep(response);
                })

            },
            updatePermission(callback){
                permission.update(
                    {
                        description:newDescription, 
                        updatedById:adminCallback.id
                    },
        
                    {
                        where: {
        
                        'id': id, }
                    }
                ).then(function(updatedPermission){
                    
                    if(updatedPermission!=0){
                        response = {
                            'statutCode': 200, // 
                            'success': 'the permission has been updated '
                        }
                        rep(response);
        
        
                    }else{
        
                        response = {
                            'statutCode': 404, // 
                            'error': 'This permission does not exist '
                        }
                        rep(response);
        
        
                    }
                }).catch(function(err){
                        response = {
                            'statutCode': 500, // error
                            'error': 'Error updating a permission ' + err
                        }
                            rep(response);
                        })

            }
       


    })
}

}

function getAllPermissions(req, res, rep){

    permission.findAll({
        include: [{model:user, as:'createdBy', attributes: [ 'first_name', 'last_name', 'email' ]}],
        
        
    }).then(function(permissionsFound){
        response = {
            'statutCode': 200, 
            'permissions': permissionsFound
        }
        rep(response);

    }).catch(function(err){
        response = {
            'statutCode': 500, // error
            'error': 'Error during getPermissions' + err
        }
            rep(response);
        })

    

}



function deletePermission(req, res, rep){
    let id=req.body.id;
    if(id==null){
        response = {
            'statutCode': 400, //bad request
            'error': 'missing parameters'
        }
        rep(response);

    }else{
        permission.destroy({
            where:{
                'id':id
            }
        }).then(function(deletedPermission){
            if(deletedPermission){
                response = {
                    'statutCode': 200, //
                    'success': 'The permission has been successfully deleted.'
                }
                rep(response);


            }else{
                response = {
                    'statutCode': 404, //bad request
                    'error': 'No permission was found with this id.'
                }
                rep(response);

            }
        })


    }




}




    
   
    

   



    return {addNewPermission, updatePermission, getAllPermissions, deletePermission};

}
