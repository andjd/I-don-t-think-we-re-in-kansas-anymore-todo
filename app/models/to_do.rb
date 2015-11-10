class ToDo < ActiveRecord::Base
  validates :title, :body, presence: true



end
