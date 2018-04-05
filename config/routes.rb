Rails.application.routes.draw do
  root to: 'tasks#index'
  namespace :api do
    resources :tasks, only: [:index, :update]
  end
end
