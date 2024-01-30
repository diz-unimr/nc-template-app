<?php

declare(strict_types=1);
// SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\TemplateApp\Tests\Unit\Controller;

use OCA\TemplateApp\Controller\NoteController;
use OCA\TemplateApp\Service\NoteService;

use OCP\IRequest;

class NoteControllerTest extends NoteControllerBase {
	protected NoteController $controller;
	protected string $userId = 'john';
	protected $service;
	protected $request;

	public function setUp(): void {
		$this->request = $this->getMockBuilder(IRequest::class)->getMock();
		$this->service = $this->getMockBuilder(NoteService::class)
			->disableOriginalConstructor()
			->getMock();
		$this->controller = new NoteController($this->request, $this->service, $this->userId);
	}

}
