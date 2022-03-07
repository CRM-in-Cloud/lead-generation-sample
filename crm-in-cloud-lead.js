/*
Form to CRM in Cloud
(c) 2019 TeamSystem S.p.a.
Details on https://github.com/CRM-in-Cloud
*/

var crmincloudlead = {
    _nn: '[name=crmincloud_submit]',
    _ak: null,
    _sn: null,
    init: function init(apikey) {
        this._ak = apikey;
        this._sn = document.querySelector('input' + this._nn + '');
        if (this._sn)
            this._sn.addEventListener('click', function (e) {
                this.submit(e);
            }.bind(this), false);
    },
    submit: function () {
        var q = '';
        ['input', 'textarea', 'select'].forEach(function (e) {
            q += e;
            q += '[name^=crmincloud_]:not(' + this._nn + ')';
            q += ',';
        }.bind(this));
        var nodes = document.querySelectorAll(q.slice(0, -1)), i,
            jsonForm = {},
            isValid = true;

        for (i = 0; i < nodes.length; ++i) {
            var n = nodes[i],
                key = n['name'].substr(11),
                value = n['value'];
            if (typeof n.willValidate !== 'undefined') {
                if (!n.checkValidity()) {
                    n.parentElement.classList.add('error');
                    n.addEventListener('blur', function (e) {
                        this.parentElement.classList.remove('error');
                    }, false);
                    isValid = false;
                } else
                    n.parentElement.classList.remove('error');
            } else {
                n.validity = field.validity || {};
                n.validity.valid = this.legacyValidation(n);
            }
            jsonForm[key] = value;
        }
        if (isValid) {
            this.post(JSON.stringify(jsonForm), this);
        }
    },
    legacyValidation: function (n) {
        var valid = true,
            val = n.value,
            type = n.getAttribute('type'),
            chkbox = (type === 'checkbox' || type === 'radio'),
            required = n.getAttribute('required'),
            minlength = n.getAttribute('minlength'),
            maxlength = n.getAttribute('maxlength'),
            pattern = n.getAttribute('pattern');

        if (n.disabled) return valid;

        valid = valid && (!required ||
            (chkbox && n.checked) ||
            (!chkbox && val !== '')
        );

        valid = valid && (chkbox || (
            (!minlength || val.length >= minlength) &&
            (!maxlength || val.length <= maxlength)
        ));

        if (valid && pattern) {
            pattern = new RegExp(pattern);
            valid = pattern.test(val);
        }

        return valid;
    },
    post: function post(data, btn) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    btn._sn.disabled = true;
                    btn._sn.value = 'Grazie!';
                }else if(this.status === 409) {
                    console.log(this);
                    alert('E\' già presente un lead con la stessa email');
                    console.log(this.response);
                }else{
                    alert('C\'è stato un errore di registratore, rivolgersi al webmaster');
                }

            }
        });
        
        xhr.open('POST', this._ak ? 'https://api.crmincloud.it/latest/lead' : 'form-to-rest.php');
        xhr.setRequestHeader('ApiKey', this._ak);
        xhr.setRequestHeader('Crm-WebApiRules', 'LeadMustBeUniqueByEmail=true'); //inibisce duplicati
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('cache-control', 'no-cache');
        xhr.send(data);
    }
}.init(apiKey); // inserire al posto di ApiKey il token se non si vuole usare il proxy PHP
