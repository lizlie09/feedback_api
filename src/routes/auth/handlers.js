'use strict';

var internals = {};

const User = require('../../database/models/User');
const Util = require('../../lib/UtilityLibrary');
const storage = require('../../config/cloud');
const { getUrls, placeHolder } = require('../../lib/aws-s3-storage-upload')
const Crypto = require('../../lib/Crypto');


// ADMIN ----------

internals.add = (req, reply) => {
    return reply.view('auth/add-admin-test.html', {
        title: req.query.messageTitle,
        message: req.query.message,
        alertType: req.query.alertType
    });
}

internals.register_admin = async (req, reply) => {
    const newAdmin = new Admin({
        firstname: req.payload.firstname,
        middlename: req.payload.middlename,
        lastname: req.payload.lastname,
        email: req.payload.email,
        password: Crypto.encrypt(req.payload.password),
        roles: ['user', 'admin', 'customeradmin']
    });

    var reply_string = "";

    if (!Util.validateEmail(newAdmin.email))
        return reply.redirect(`/MXnGLyYy9qk2a38F?message=Invalid Email. &messageTitle=Failed &alertType=danger`);

    if (req.payload.password != req.payload.re_password)
        return reply.redirect(`/MXnGLyYy9qk2a38F?message=Passwords don't match. &messageTitle=Failed &alertType=danger`);

    if (req.payload.password < 6)
        return reply.redirect(`/MXnGLyYy9qk2a38F?message=Password must have at least 6 characters. &messageTitle=Failed &alertType=danger`);

    await User.findOne({ email: newAdmin.email })
        .then(async (admin) => {
            if (admin) {
                reply_string = 'Admin already exists. &messageTitle=Failed &alertType=danger';
            }
            else {
                if (req.payload.photo.filename != '') {
                    var urls = await getUrls(req.payload.photo, newAdmin._id, "AdminPhotos");
                    newAdmin.photo = urls
                }
                await newAdmin.save()
                    .then(() => {
                        reply_string = 'Admin successfully added. &messageTitle=Success &alertType=success';
                    })
                    .catch(err => {
                        console.log(err)
                        reply_string = 'Fill all fields. &messageTitle=Error &alertType=warning';
                    });
            }
        });

    return reply.redirect(`/MXnGLyYy9qk2a38F?message=${reply_string}`);
}

internals.adminlogin = (req, reply) => {

    if (req.auth.credentials) {
        return reply.redirect('/admin/admin-panel');
    }

    return reply.view('auth/login-admin.html', {
        title: "Visitour Admin Login",
        alert: req.query.alert,
        notFoundEmail: req.query.notFoundEmail,
        notFoundPassword: req.query.notFoundPassword,
        unauthorized: req.query.unauthorized,
    });
}

internals.authenticate_admin = async (req, reply) => {
    const { password, email } = req.payload;

    return User.findOne({ email: email })
        .then(async (adminFound) => {
            if (adminFound) {

                if (!adminFound.roles.includes('admin')) {
                    return reply.redirect('/admin-login?unauthorized=true');
                }

                if (password == Crypto.decrypt(adminFound.password)) {
                    req.cookieAuth.set(adminFound);
                    return reply.redirect('admin/admin-panel');
                } else {
                    return reply.redirect('/admin-login?notFoundPassword=true');
                }
            } else {
                return reply.redirect('/admin-login?notFoundEmail=true');
            }
        });

}

internals.sign_out_admin = (req, reply) => {
    req.cookieAuth.clear();
    return reply.redirect('/admin-login');
}

// CUSTOMER ADMIN ----------

internals.customeradminlogin = (req, reply) => {

    if (req.auth.credentials) {
        return reply.redirect('/customer-admin/admin-panel');
    }

    return reply.view('auth/login-customer-admin.html', {
        title: "Visitour Admin Login",
        alert: req.query.alert,
        notFound: req.query.notFound,
        notFoundEmail: req.query.notFoundEmail,
        notFoundPassword: req.query.notFoundPassword,
        unauthorized: req.query.unauthorized,
    });
}

internals.authenticate_customeradmin = async (req, reply) => {
    const { password, email } = req.payload;

    return User.findOne({ email: email })
        .then(async (customeradmin) => {
            if (customeradmin) {

                if (!customeradmin.roles.includes('customeradmin')) {
                    return reply.redirect('/admin-login?unauthorized=true');
                }

                if (password == Crypto.decrypt(customeradmin.password)) {
                    req.cookieAuth.set(customeradmin);
                    return reply.redirect('customer-admin/admin-panel');
                } else {
                    return reply.redirect('/admin-login?notFoundPassword=true');
                }
            }
            else {
                return reply.redirect('/admin-login?notFoundEmail=true');
            }
        });
}

internals.sign_out = async (req, reply) => {
    await req.cookieAuth.clear();
    return reply.redirect('/admin-login');
}


module.exports = internals;
