FactoryBot.define do
  factory :list do
    board
    title { FFaker::Lorem.word }
  end
end
