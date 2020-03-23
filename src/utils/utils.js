class Utils {

    static handleError(error) {
        let erroMessage = `${error.name}: ${error.message}`;
        return Promise.reject(new Error(erroMessage));
    }

    static verifyToken(context) {
        const user = context.req.context.authUser;
        if (!user) throw new Error('You are not authenticated!');
        return user;
    }

    static throwError(condition, message) {
        if(condition) throw new Error(message);
    }
    static JWT_SECRET() {
        return process.env.JWT_SECRET;
    }

}

module.exports = Utils;
