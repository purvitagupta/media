<?php

namespace Drupal\content_entity_builder\Plugin\BaseFieldConfig;

use Drupal\Core\Form\FormStateInterface;
use Drupal\content_entity_builder\ConfigurableBaseFieldConfigBase;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * ChangedItemBaseFieldConfig.
 *
 * @BaseFieldConfig(
 *   id = "changed_base_field_config",
 *   label = @Translation("Last changed"),
 *   description = @Translation("An entity field containing a UNIX timestamp of when the entity has been last updated."),
 *   field_type = "changed",
 * )
 */
class ChangedItemBaseFieldConfig extends ConfigurableBaseFieldConfigBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function buildBaseFieldDefinition() {
    $label = $this->getLabel();
    $description = $this->getDescription();
    $weight = $this->getWeight();

    $base_field_definition = BaseFieldDefinition::create("changed")
      ->setLabel($label)
      ->setDescription($description)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'timestamp',
        'weight' => $weight,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    return $base_field_definition;
  }

  /**
   * {@inheritdoc}
   */
  public function buildDefaultValueForm(array $form, FormStateInterface $form_state) {
    return NULL;
  }

}
