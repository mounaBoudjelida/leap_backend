
var async = require('async-if-else')(require('async')); 


module.exports = function (user, role, permission) {


function addNewRole(req, res, rep){
    let title =req.body.title;
    let description=req.body.description;
    let permissions=req.body.permissions;
    let emailCreatedBy=req.body.emailCreatedBy;
    if(title==null || description==null || emailCreatedBy==null){
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
                        'error': 'erreur apparu' + err
                    }
                    rep(response);
                })

            },
            roleExistant(callback){
                role.findOne({
                    where: {
        
                        'title': title, 
                        
        
                    }
                }).then(function(roleFound){
                    if(roleFound){
                        response = {
                            'statutCode': 409, // conflit
                            'error': 'A role with the same title already exists' 
                        }
                        rep(response);
                        
                    }else{
                        callback();

                    }
                }).catch(function(err){
                    response = {
                        'statutCode': 500, // error
                        'error': 'erreur apparu' + err
                    }
                    rep(response);
                })
            },

            addNewRole(callback){
                role.create({
                    title,
                    description,
                    permissions,
                    createdById:adminCallback.id

                }
                   
                ).then(function(createdRole){
                    if(createdRole){
                        response = {
                            'statutCode': 201, // created
                            'success': 'the role was successfully created'
                        }
                        rep(response);

                    }else{
                        response = {
                            'statutCode': 500, // error
                            'error': 'error in adding new role' + err
                        }
                        rep(response);

                    }
                }).catch(function(err){
                    response = {
                        'statutCode': 500, // error
                        'error': 'error in adding new role' + err
                    }
                    rep(response);

                })
            }
        })
        

        




    }



}



function updateRole(req, res, rep){
    let id=req.body.id;
    let newTitle=req.body.newTitle;
    let newDescription=req.body.newDescription;
    let newPermissions=req.body.newPermissions;
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
            updateRole(callback){
                role.update(
                    {
                        title:newTitle,
                        description:newDescription, 
                        permissions:newPermissions,
                        updatedById:adminCallback.id
                    },
        
                    {
                        where: {
        
                        'id': id, }
                    }
                ).then(function(updatedRole){
                    
                    if(updatedRole!=0){
                        response = {
                            'statutCode': 200, // 
                            'success': 'the role has been updated '
                        }
                        rep(response);
        
        
                    }else{
        
                        response = {
                            'statutCode': 404, // 
                            'error': 'This role does not exist '
                        }
                        rep(response);
        
        
                    }
                }).catch(function(err){
                        response = {
                            'statutCode': 500, // error
                            'error': 'Error updating a role ' + err
                        }
                            rep(response);
                        })

            }
       


    })
}

}

function getAllRoles(req, res, rep){

    role.findAll({
        include: [{model:user, as:'createdBy', attributes: [ 'first_name', 'last_name', 'email' ]}],
        
        
    }).then(function(rolesFound){
        response = {
            'statutCode': 200, 
            'roles': rolesFound
        }
        rep(response);

    }).catch(function(err){
        response = {
            'statutCode': 500, // error
            'error': 'Error during getRoles' + err
        }
            rep(response);
        })

    

}



function deleteRole(req, res, rep){
    let id=req.body.id;
    if(id==null){
        response = {
            'statutCode': 400, //bad request
            'error': 'missing parameters'
        }
        rep(response);

    }else{
        role.destroy({
            where:{
                'id':id
            }
        }).then(function(deletedRole){
            if(deletedRole){
                response = {
                    'statutCode': 200, //
                    'success': 'The role has been successfully deleted.'
                }
                rep(response);


            }else{
                response = {
                    'statutCode': 404, //bad request
                    'error': 'No role was found with this id.'
                }
                rep(response);

            }
        })


    }




}




    
   
    

   



    return {addNewRole, updateRole, getAllRoles, deleteRole };

}
