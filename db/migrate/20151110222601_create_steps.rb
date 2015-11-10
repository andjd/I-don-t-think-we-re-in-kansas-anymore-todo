class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.integer :to_do_id, null: false
      t.string :bit, null: false
      t.boolean :done, default: false

      t.timestamps null: false
    end
    add_index :steps, :to_do_id
  end
end
