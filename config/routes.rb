Rails.application.routes.draw do
  root to: 'tasks#index'
  namespace :api do
    resources :tasks, only: :update
    resources :sessions, only: :create
  end
end
