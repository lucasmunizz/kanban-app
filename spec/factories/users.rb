FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "foo#{n}@exemplo.com" }
    password { "password "}
  end
end
