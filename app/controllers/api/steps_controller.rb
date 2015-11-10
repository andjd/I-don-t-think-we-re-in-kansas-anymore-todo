class Api::StepsController < ApplicationController
  def index
    steps = Step.find_by_to_do_id(params[to_do_id])
    render json: steps
  end

  def create
    to_do = ToDo.find(params[to_do_id])
    step = to_do.steps.create!(step_params)
    render json: step
  end

  def

private
  def step_params
    params.require(:step).permit(:bit)
end
