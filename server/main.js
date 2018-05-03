import { Meteor } from 'meteor/meteor';
import { Links } from "../imports/collections/links";
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
    Meteor.publish('links', function() {
        return Links.find({});
    });
});

function onRoute(req, res, next) {
    const link = Links.findOne({ token: req.params.token });

    if (link) {
        // If we find a link object, redirect the user to the long URL

        //We want to update this link by increment the clicks property, by one
        Links.update(link, {$inc: {clicks: 1}});
        res.writeHead(307, {'Location': link.url});
        res.end();
    } else {
        // If we don't find a link object, send the user to our normal React app
        next();
    }
}

const middleWare = ConnectRoute(function(router) {
    router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleWare);