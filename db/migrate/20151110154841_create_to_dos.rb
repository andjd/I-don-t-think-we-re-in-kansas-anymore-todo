class CreateToDos < ActiveRecord::Migration
  def change
    create_table :to_dos do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.boolean :done, default: false

      t.timestamps null: false
    end
    add_index :to_dos, :title
  end
end
