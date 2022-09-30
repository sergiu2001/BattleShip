<?php

namespace App\Entity;

use App\Repository\BattlesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BattlesRepository::class)]
class Battles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private Users $user1;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private Users $user2;

    #[ORM\Column(length: 255)]
    private ?string $winner = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $user1_board = [];

    #[ORM\Column(type: Types::ARRAY)]
    private array $user2_board = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser1(): Users
    {
        return $this->user1;
    }

    public function setUser1(Users $user1): self
    {
        $this->user1 = $user1;

        return $this;
    }

    public function getUser2(): Users
    {
        return $this->user2;
    }

    public function setUser2(Users $user2): self
    {
        $this->user2 = $user2;

        return $this;
    }

    public function getWinner(): ?string
    {
        return $this->winner;
    }

    public function setWinner(string $winner): self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getUser1Board(): array
    {
        return $this->user1_board;
    }

    public function setUser1Board(array $user1_board): self
    {
        $this->user1_board = $user1_board;

        return $this;
    }

    public function getUser2Board(): array
    {
        return $this->user2_board;
    }

    public function setUser2Board(array $user2_board): self
    {
        $this->user2_board = $user2_board;

        return $this;
    }
}
