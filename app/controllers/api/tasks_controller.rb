module Api
  class TasksController < ApplicationController
    def update
      @task = Task.find(params[:id])
      handle_completions!
      render :show
    end

    def handle_completions!
      is_complete = params.require(:task)[:is_complete]
      return if is_complete.nil?

      if is_complete
        @task.complete!
      else
        @task.uncomplete!
      end
    end
  end
end
