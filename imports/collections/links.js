import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match} from 'meteor/check';

Meteor.methods({
    //This is a valid JS key, this insert has to do with links collection
    //Now we create a meteor method, by calling links.insert, this function will be ran
    'links.insert': (url) => {
        //Use Match.Where when we want to add custom validation
        //we have default check for string/boolean... with meteor, but for url, we need a custom function
        //so that's why we need to use Match.Where to add the custom validation in
        check(url, Match.Where(url => validUrl.isUri(url)));

        // We're ready to save the url
        const token = Math.random().toString(36).slice(-5);
        Links.insert({ url, token, clicks: 0 });
    }
});

export const Links = new Mongo.Collection('links');
