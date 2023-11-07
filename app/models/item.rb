class Item < ApplicationRecord
  belongs_to :list

  before_save :update_completed_at, if: :list_done?

  validates :title, presence: true

  private

  def list_done?
    list.title == 'Done'
    puts
  end

  def update_completed_at
    self.completed_at = Time.now
    save!
  end
end
