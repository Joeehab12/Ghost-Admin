import RESTSerializer from 'ember-data/serializers/rest';
import {decamelize} from '@ember/string';
import {pluralize} from 'ember-inflector';

export default RESTSerializer.extend({
    serialize(/*snapshot, options*/) {
        let json = this._super(...arguments);

        // don't send attributes that are updated automatically on the server
        delete json.created_by;
        delete json.updated_by;

        return json;
    },

    serializeIntoHash(hash, type, record, options) {
        // Our API expects an id on the posted object
        options = options || {};
        options.includeId = true;

        // We have a plural root in the API
        let root = pluralize(type.modelName);
        let data = this.serialize(record, options);

        hash[root] = [data];
    },

    keyForAttribute(attr) {
        return decamelize(attr);
    }
});
