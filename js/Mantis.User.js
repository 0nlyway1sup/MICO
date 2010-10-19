/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.User.js
 ** 
 ** Description: Defines a simple user object
 *******************************************************************************
 ******************************************************************************/
Ext.namespace('Mantis.User');

Mantis.User = function () {
    var user_id;
    var session;
    var role;
    var vars;
    var vars_orig;
    var dirty;
    
    return {
        /** Initialise the user object */
        init: function (user_id, session, role, vars) {
            this.user_id = parseInt(user_id);
            this.session = session;
            this.role = role;
            this.vars = vars;
            this.vars_orig = vars;
            this.dirty = false;
        },
        /** Get the session (required to authenticate all API calls)
         * @returns {string} The session key
         */
        getSession: function () {
            return this.session;
        },
        /** Gets a variable (if it exists)
         * @param key {string} The variable key
         */
        getVar: function (key) {
            return this.vars[key];
        },
        /** Gets a variable (if it exists), or returns the passed default
         * @param key {string} The variable key
         * @param def {mixed} The default to use of the key doesn't exist
         */
        getVarDefault: function (key, def) {
            return (this.vars[key]===undefined?def:this.vars[key]);
        },
        /** Sets a variable
         * @param key {string} The variable key
         * @param val {mixed} The variable value
         */
        setVar: function (key, val) {
            this.vars[key] = val;
            this.dirty = true;
        },
        /** Commits all variable changes to the database */
        commit: function () {
            // only bother if the data is dirty
            if (this.dirty) {
                var conn = new Ext.data.Connection();
                
                // send the 'save' request to the server
                conn.request({
                    url:APP_ROOT+'/api.php?f=saveUserVars',
                    params: {
                        session: Mantis.User.getSession(),
                        vars: Mantis.Utils.serialiseArray(this.vars)
                    },
                    success: function (res, opt) {
                        // hide any message box
                        Ext.Msg.hide();
                        // set the variables
                        this.orig_vars = this.vars;
                        this.dirty = false;
                        // notify the user that this has been completed
                    },
                    failure: function (res, opt) {
                        var msg = "Unknown system error";
                        if (res.result !== undefined) {
                            msg = res.result.info;
                        }
                        Ext.Msg.alert("Error", msg);
                    },
                    scope: this
                })
            }
        },
        /** Reverts all un-commited changes */
        revert: function () {
            this.vars = this.orig_vars;
            this.dirty = false;
        },
        logout: function () {
            Ext.Msg.wait('Log out','Logging you out',{
                closable:false,
                modal:true
            });
            
            var conn = new Ext.data.Connection();
            
            // send the logout request
            conn.request({
                url:APP_ROOT+'/api.php?f=logout',
                params: {
                    session: Mantis.User.getSession()
                },
                callback: function (options, success, response) {
                    var res = Ext.decode(response.responseText);
                    if (success && res.success) {
                        // notify the user that the action was successful
                        Ext.Msg.updateProgress(1,'Logged Out','You have been logged out. Please wait while you are redirected.')
                        
                        // reload the interface
                        window.location.reload(true);
                    } else {
                        Ext.Msg.hide();
                        var msg = "Unknown system error";
                        if (res.result !== undefined) {
                            msg = res.result.info;
                        }
                        Ext.Msg.alert("Error", msg);
                    }
                },
                scope: this
            });
        }
    };
} ();