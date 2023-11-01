require 'rails_helper'

RSpec.describe "Items", type: :request do

  let(:user) { create(:user) }
  let(:board) { create(:board, user: user)}
  let(:list) { create(:list, board: board)}

  before do
    sign_in user
  end

  describe "GET new" do
    it 'suceeds' do
      get new_list_item_path(list)
      expect(response).to have_http_status(200)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new board and redirect" do
        expect do
          post list_items_path(list), params: {
            item: {
              title: "New board",
              description: "New description"
            }
          }
        end.to change { Item.count }.by(1)
        expect(response).to have_http_status(:redirect)
      end
    end

    context "with invalid params" do
      it "not creates a new board and not redirect" do
        expect do
          post list_items_path(list), params: {
            item: {
              title: "",
              description: ""
            }
          }
        end.not_to change { Item.count }
        expect(response).to have_http_status(:success)
      end
    end
  end
end
