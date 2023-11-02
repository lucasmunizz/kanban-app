FactoryBot.define do
  factory :board do
    name { FFaker::Lorem.word }
    user
  end
end
