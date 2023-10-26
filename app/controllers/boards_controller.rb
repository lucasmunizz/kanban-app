class BoardsController < ApplicationController
  before_action :authenticate_user!

  def create
    @board = Board.new
  end
end