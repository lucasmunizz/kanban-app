require 'rails_helper'

RSpec.describe "Lists", type: :request do

  let(:user) { create(:user) }
  let(:board) { create(:board, user: user)}
  let(:list) { create(:list, board: board)}

  before do
    sign_in user
  end

  describe "GET new" do
    it 'suceeds' do
      get new_board_list_path(board)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET edit" do
    it 'suceeds' do
      get edit_board_list_path(board, list)
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new board and redirect" do
        expect do
          post board_lists_path(board), params: {
            list: {
              title: "New board"
            }
          }
        end.to change { List.count }.by(1)
        expect(response).to have_http_status(:redirect)
      end
    end

    context "with invalid params" do
      it "not creates a new board and not redirect" do
        expect do
          post board_lists_path(board), params: {
            list: {
              title: ""
            }
          }
        end.not_to change { List.count }
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PUT update" do
    context "with valid params" do
      it 'updates the board and redirects' do
        expect do
          put board_list_path(board, list), params: {
            list: {
              title: "Updated List"
            }
          }
        end.to change { list.reload.title}.to("Updated List")
        expect(response).to have_http_status(:redirect)
      end
    end

    context "with invalid params" do
      it 'not updates the board and not redirect' do
        expect do
          put board_list_path(board, list), params: {
            list: {
              title: ""
            }
          }
        end.not_to change { list.reload.title }
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "DELETE destroy" do
    context "" do
      it "its suceed" do
        list
        expect do
          delete board_list_path(board, list), headers: { 'ACCEPT': 'application/json' }
        end.to change { List.count }.by(-1)
      end
    end
  end
end
