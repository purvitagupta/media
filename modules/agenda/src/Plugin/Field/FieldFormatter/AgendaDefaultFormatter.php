<?php
namespace Drupal\agenda\Plugin\Field\FieldFormatter;
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
/**
 * @FieldFormatter(
 *     id = "agenda_default",
 *     label = @Translation("Agenda"),
 *     field_types = {
 *          "agenda"
 *     }
 * )
 */
class AgendaDefaultFormatter extends FormatterBase {
    /**
     * Builds a renderable array for a field value.
     *
     * @param \Drupal\Core\Field\FieldItemListInterface $items
     *   The field values to be rendered.
     * @param string $langcode
     *   The language that should be used to render the field.
     *
     * @return array
     *   A renderable array for $items, as an array of child elements keyed by
     *   consecutive numeric indexes starting from 0.
     */
    public function viewElements(FieldItemListInterface $items, $langcode)
    {
        $days = [];
        $elements = [];
        $node = \Drupal::routeMatch()->getParameter('node');
        if ($node){
            $days_ids = $node->field_agenda_sections->getValue();
            foreach ( $days_ids as $delts => $day_id) {
                $days[$day_id['value']] = FieldCollectionItem::load($day_id['value'])->get('field_page_title')->value;
            }
        }
//        echo '<pre>';
//        print_r($items);
//        echo '</pre>';
//        die();
        foreach ($items as $delta => $item){

            if(isset($days[$item->value])){

                $elements[$delta] = [
                    '#type' => 'markup',
                    '#markup' => $days[$item->value],
                ];
            }
        }
        return $elements;
    }
}