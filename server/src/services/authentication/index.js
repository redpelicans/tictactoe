'use strict';

const authentication = require('feathers-authentication');

const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GithubStrategy = require('passport-github').Strategy;
const GithubTokenStrategy = require('passport-github-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const LinkedinTokenStrategy = require('passport-linkedin-token-oauth2').Strategy;
const PaypalStrategy = require('passport-paypal-oauth').Strategy;
const PaypalTokenStrategy = require('passport-paypal-token');
const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  
  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.github.strategy = GithubStrategy;
  config.github.tokenStrategy = GithubTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;
  config.linkedin.strategy = LinkedinStrategy;
  config.linkedin.tokenStrategy = LinkedinTokenStrategy;
  config.paypal.strategy = PaypalStrategy;
  config.paypal.tokenStrategy = PaypalTokenStrategy;
  config.spotify.strategy = SpotifyStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
