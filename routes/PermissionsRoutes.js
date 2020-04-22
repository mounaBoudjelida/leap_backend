module.exports = function (express, permissionsController) {

    const router = express.Router();
    
    router.post('/permission', (req, res) => {

        permissionsController.addNewPermission(req, res, (response) => {
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


  

    router.get('/permissions', (req, res) => {

        permissionsController.getAllPermissions(req, res, (response) => {
            if (response.statutCode == 200) {
                res.status(response.statutCode).json({
                    'success': response.success,
                    'permissions':response.permissions,
                    
                   
                
                });
            }
            else {
                res.status(response.statutCode).json({ 
                    'error': response.error,
                    
                   
                });
            }
        })

    });


    router.delete('/permission', (req, res) => {

        permissionsController.deletePermission(req, res, (response) => {
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


    router.put('/permission', (req, res) => {

        permissionsController.updatePermission(req, res, (response) => {
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