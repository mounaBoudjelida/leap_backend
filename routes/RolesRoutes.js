module.exports = function (express, rolesController) {

    const router = express.Router();
    
    router.post('/role', (req, res) => {

        rolesController.addNewRole(req, res, (response) => {
            if (response.statutCode == 200) {
                res.status(response.statutCode).json({
                    'success': response.success,
                    
                   
                
                });
            }
            else {
                res.status(response.statutCode).json({ 
                    'error': response.error,
                    
                   
                });
            }
        })

    });


  

    router.get('/roles', (req, res) => {

        rolesController.getAllRoles(req, res, (response) => {
            if (response.statutCode == 200) {
                res.status(response.statutCode).json({
                    'success': response.success,
                    'roles':response.roles,
                    
                   
                
                });
            }
            else {
                res.status(response.statutCode).json({ 
                    'error': response.error,
                    
                   
                });
            }
        })

    });


    router.delete('/role', (req, res) => {

        rolesController.deleteRole(req, res, (response) => {
            if (response.statutCode == 200) {
                res.status(response.statutCode).json({
                    'success': response.success,
                    
                    
                   
                
                });
            }
            else {
                res.status(response.statutCode).json({ 
                    'error': response.error,
                    
                   
                });
            }
        })

    });


    router.put('/role', (req, res) => {

        rolesController.updateRole(req, res, (response) => {
            if (response.statutCode == 200) {
                res.status(response.statutCode).json({
                    'success': response.success,
     
                });
            }
            else {
                res.status(response.statutCode).json({ 
                    'error': response.error,
                    
                   
                });
            }
        })

    });


  

   

   

  
    
  

    //exports :
    return router;

}