class ItemsController < ApplicationController
    before_action :authenticate_user!

    protect_from_forgery with: :null_session, only: :destroy

    def new
      @item = list.items.new
    end

    def edit
      @item = list.items.find(params[:id])
    end

    def update
      @item = list.items.find(params[:id])

      if @item.update(items_params)
        redirect_to board_path(list.board)
      else
        render :edit
      end
    end

    def create
      @item = list.items.new(items_params)

      if @item.save
        redirect_to board_path(list.board)
      else
        render :new
      end
    end

    def destroy
      @item = list.items.find(params[:id])
      @item.destroy
      respond_to do |format|
        format.json do
          render json: {}, status: 200
        end
      end
    end

    private

    def list
      @list ||= List.find(params[:list_id])
    end

    def items_params
      params.require(:item).permit(:title, :description)
    end
end