class Api::ToDosController < ApplicationController

  def index
    all_to_dos = ToDo.all
    render json: all_to_dos
  end

  def show
    to_do = ToDo.find(params[:id])
    if to_do
      render json: to_do
    else
      render json: {}, status: :unpreocessable_entity
    end
  end

  def create
    to_do = ToDo.create!(to_do_params)
    render json: to_do
  end

  def update
    to_do = ToDo.find(params[:id])
    to_do.update!(to_do_params)
    render json: to_do
  end

  def destroy
    to_do = ToDo.find(params[:id])
    to_do.destroy!
    render text: "true"
  end


  private
  def to_do_params
    params.require(:to_do).permit(:title, :body, :done)
  end
end
