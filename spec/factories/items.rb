FactoryBot.define do
  factory :item do
    list
    title { FFaker::Lorem.word }
  end
end
