const validatorMiddleWare=(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    };
    next();
}
module.exports=validatorMiddleWare;