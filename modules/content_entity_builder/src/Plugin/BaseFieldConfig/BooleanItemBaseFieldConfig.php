<?php

namespace Drupal\content_entity_builder\Plugin\BaseFieldConfig;

use Drupal\Core\Form\FormStateInterface;
use Drupal\content_entity_builder\ConfigurableBaseFieldConfigBase;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * BooleanItemBaseFieldConfig.
 *
 * @BaseFieldConfig(
 *   id = "boolean_base_field_config",
 *   label = @Translation("Boolean"),
 *   description = @Translation("An entity field containing a boolean value."),
 *   field_type = "boolean",
 * )
 */
class BooleanItemBaseFieldConfig extends ConfigurableBaseFieldConfigBase {

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
    // $field_type = $this->getFieldType();
    $label = $this->getLabel();
    $weight = $this->getWeight();
    $default_value = $this->getDefaultValue();
    $required = $this->isRequired();
    $description = $this->getDescription();

    $base_field_definition = BaseFieldDefinition::create("boolean")
      ->setLabel($label)
      ->setDescription($description)
      ->setRequired($required)
      ->setDefaultValue($default_value)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'boolean',
        'weight' => $weight,
      ])
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
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
    $form['value'] = [
      '#type' => 'checkbox',
      '#title' => $this->getFieldName(),
      '#default_value' => $this->getDefaultValue(),
    ];

    return $form;
  }

}
