const intentionalErrorController = {}

intentionalErrorController.triggerError = async (req, res, next) => {
    res.render("errors/error", {
        title: "Intentional Error",
    })
}

module.exports = intentionalErrorController