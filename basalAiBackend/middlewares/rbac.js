
const rbac = (roles) =>{
    return (req,res,next)=>{
        if (roles.includes(req.role)){
            next()
        }else{
            res.status(500).json({ msg: "You are not authorized for this action" });
        }
    }
}

module.exports = {rbac}