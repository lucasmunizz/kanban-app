require 'rails_helper'

RSpec.describe "Boards", type: :request do

  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe "GET new" do
    it 'suceeds' do
      get new_board_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new board and redirect" do
        expect do
          post boards_path, params: {
            board: {
              name: "New board"
            }
          }
        end.to change { Board.count }.by(1)
        expect(response).to have_http_status(:redirect)
      end
    end

    context "with invalid params" do
      it "not creates a new board and not redirect" do
        expect do
          post boards_path, params: {
            board: {
              name: ""
            }
          }
        end.not_to change { Board.count }
        expect(response).to have_http_status(:success)
      end
    end
  end
end
