require 'openssl'
require 'json'

module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(username: params[:username])

      if @user && @user.authenticate(params[:password])
        session = {
          user_id: @user.id,
          logged_in_at: Time.zone.now,
        }
        Rails.logger.info('successful login')
        render json: sign(session)
      else
        Rails.logger.info('failed login')
        # display an error message
      end
    end

    def sign(session)
      session.merge(
        signature: OpenSSL::HMAC.new(DIGEST, SECRET, session.to_json)
      )
    end

    DIGEST = OpenSSL::Digest.new('sha1')
    SECRET = 'secret!!'
  end
end
